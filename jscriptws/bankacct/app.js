function createAccount(pinCode, amount) {
    let currentPin = pinCode;
    let currentAmount = amount;

    return {
        pin: currentPin,
        balance: currentAmount,
        checkBalance: function () {
        }
    }
}