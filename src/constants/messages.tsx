export const handleMesages = (message: string, params: Array<any>) => {
    let result = message.toString();
    params.forEach((item, idx) => {
        result = result.replace(`{${idx + 1}}`, item);
    })

    return result;
}

export const MESSAGE = {
    E0001: "The {1} item is required",
    E0002: "The {1} items must be less than {2} characters",
    E0003: "The {1} items must be greater than {2} characters",
}
