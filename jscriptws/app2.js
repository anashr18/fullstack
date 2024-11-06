class BankAccount {
    constructor(balance = 0, acctHolder, accNum) {
        this.balance = balance;
        this.acctHolder = acctHolder;
        this.accNum = accNum;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. New balance: $${this.balance}`);
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. New balance: $${this.balance}`);
        } else {
            console.log("Insufficient funds");
        }
    }
}