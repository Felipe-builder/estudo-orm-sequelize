class EmailsServices {
    static geraEndereco(rota, id) {
        const baseURL = process.env.BASE_URL+process.env.PORT;
        return `${baseURL}${rota}${id}`
    }
}

module.exports = EmailsServices;