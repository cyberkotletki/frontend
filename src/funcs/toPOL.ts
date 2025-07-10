import Decimal from "decimal.js";

const toPOL = (amount: any) => {
    return new Decimal(amount).div(1e18);
}

export default toPOL;