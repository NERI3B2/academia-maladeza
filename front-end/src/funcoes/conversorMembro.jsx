const conversorMembro = valor => {
    switch (valor) {
        case 'BR':
            return 'Braço'
        case 'CT':
            return 'Costas'
        case 'PE':
            return 'Perna'
        case 'PT':
            return 'Peito'
        case 'AB':
            return 'Abdomem'
        default:
            return '';
    }
}
export default conversorMembro