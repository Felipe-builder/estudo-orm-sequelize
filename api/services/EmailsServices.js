class EmailsServices {
    static geraEndereco(rota, token) {
        const baseURL = process.env.BASE_URL+process.env.PORT;
        return `${baseURL}${rota}${token}`
    }
}

module.exports = EmailsServices;