class PowerUp {

    constructor(_type, _amount) {

        switch (_type) {
            case 1: //Vida
                this.type = _type;
                this.amount = _amount;
                break;
            case 2: //Disparo mas rapido
                this.type = _type;
                this.amount = _amount;
                break;
            default: //Mas velocidad
                this.type = _type;
                this.amount = _amount;
                break;
        }

    }

}