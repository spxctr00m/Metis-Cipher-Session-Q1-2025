// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract KREED_ERC20 {

    bytes4 private constant ERC20_INTERFACE_ID = 
        bytes4(keccak256('totalSupply()')) ^
        bytes4(keccak256('balanceOf(address)')) ^
        bytes4(keccak256('transfer(address,uint256)')) ^
        bytes4(keccak256('allowance(address,address)')) ^
        bytes4(keccak256('approve(address,uint256)')) ^
        bytes4(keccak256('transferFrom(address,address,uint256)'));
    
    bytes4 private constant ERC165_INTERFACE_ID = 0x01ffc9a7;
    

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
    

    string public name_;
    string public symbol_;
    uint8 public immutable decimals_;
    uint initial_supply_;
    uint256 public TotalSupply;
    
    address public owner;
    
    mapping(address => uint256) public BalanceOf;
    mapping(address => mapping(address => uint256)) public Allowance;
    mapping(address => uint256) public nonces;
    
    uint256 internal immutable INITIAL_CHAIN_ID;
    bytes32 internal immutable INITIAL_DOMAIN_SEPARATOR;
    
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name_ = _name;
        symbol_ = _symbol;
        decimals_ = _decimals;
        initial_supply_ = _initialSupply;
        owner = msg.sender;
        
         

        INITIAL_CHAIN_ID = block.chainid;
        INITIAL_DOMAIN_SEPARATOR = computeDomainSeparator();
    }
    
       modifier onlyOwner() {
        require(msg.sender == owner, "ERROR!:function can only be called by contract owner!");
        _;
    }


    function totalSupply() public view returns (uint256) {
        return TotalSupply;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return BalanceOf[account];
    }
    
    //Owner to transfer to External_receipient
    function transfer(address toRecepient, uint256 amount)onlyOwner() public virtual returns (bool) {
        
        BalanceOf[msg.sender] -= amount;
        BalanceOf[toRecepient] += amount;
        
        emit Transfer(msg.sender, toRecepient, amount);
        return true;
    }

     //check assistant/spender"s current allowance
    function allowance(address owner0, address spender) public view returns (uint256) {
        return Allowance[owner0][spender];
    }
    
  //Owner to allocate to withdrawable token to spender or assistant to spend on his behalf or absense
    function approve(address spender, uint256 amount)onlyOwner() public virtual returns (bool) {
        require(spender != address(0), "contract: approve to the zero address");
        
        Allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    

    //spender to transfer on behalf of owner
    function transferFrom(
        address from0wner,
        address toUser,
        uint256 amount
    ) public virtual returns (bool) {
        require(from0wner != address(0), "contract: transfer from the zero address");
        require(toUser != address(0), "contract: transfer to the zero address");
        require(BalanceOf[from0wner] >= amount, "contract: transfer amount exceeds balance");
        
        //msg.sender here = current function caller/spender
        uint256 currentAllowance = Allowance[from0wner][msg.sender];
        require(currentAllowance >= amount, "contract: transfer amount exceeds allowance");
        
        
        if (currentAllowance != type(uint256).max) {
            Allowance[from0wner][msg.sender] = currentAllowance - amount;
        }
        
        BalanceOf[from0wner] -= amount;
        BalanceOf[toUser] += amount;
        
        emit Transfer(from0wner, toUser, amount);
        return true;
    }
    
    // EIP-2612 Permit function
    //aka: give me permission to be able to withdraw this amount from a particular address within a particular time frame
    function permit(
        address owner0,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public virtual {
        require(deadline >= block.timestamp, "TT: permit expired");
        
        // Calculate digest for signature verification
        bytes32 generated_hash = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR(),
                keccak256(
                    abi.encode(
                        keccak256("Permit(address owner0,address spender,uint256 value,uint256 nonce,uint256 deadline)"),
                        owner0,
                        spender,
                        value,
                        nonces[owner]++,
                        deadline
                    )
                )
            )
        );
        
        //recover address native to this hash
        address recoveredAddress = ecrecover(generated_hash, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner0, "TT: invalid signature");
        
        Allowance[owner0][spender] = value;
        emit Approval(owner0, spender, value);
    }
    
    // EIP-712 Domain separator
    function DOMAIN_SEPARATOR() public view virtual returns (bytes32) {
        return block.chainid == INITIAL_CHAIN_ID ? INITIAL_DOMAIN_SEPARATOR : computeDomainSeparator();
    }
    
    function computeDomainSeparator() internal view virtual returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                    keccak256(bytes(name_)),
                    keccak256("1"),
                    block.chainid,
                    address(this)
                )
            );
    }
    
    
    function _mint(address to, uint256 amount) internal virtual {
        require(to != address(0), "contract: cannot mint to the zero address");
        
        TotalSupply += amount;
        BalanceOf[to] += amount;
        
        emit Transfer(address(0), to, amount);
    }
    
    function _burn(address from, uint256 amount) internal virtual {
        require(from != address(0), "contract: cannot burn from the zero address");
        
        uint256 accountBalance = BalanceOf[from];
        require(accountBalance >= amount, "contract: burn amount exceeds balance");
        
        BalanceOf[from] = accountBalance - amount;
        TotalSupply -= amount;
        
        emit Transfer(from, address(0), amount);
    }
    
    
    function burnFrom(address fromOwner, uint256 amount)public {
        uint256 currentAllowance = Allowance[fromOwner][msg.sender];
        require(currentAllowance >= amount, "contract: burn amount exceeds allowance");
        
        if (currentAllowance != type(uint256).max) {
            Allowance[fromOwner][msg.sender] = currentAllowance - amount;
        }
        
        //return burnt amount to creator's balance
        BalanceOf[fromOwner] += amount;
    }
    

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "contract: new owner is the zero address");
        owner = newOwner;
    }
    
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return
            interfaceId == ERC20_INTERFACE_ID ||
            interfaceId == ERC165_INTERFACE_ID;
    }
}



