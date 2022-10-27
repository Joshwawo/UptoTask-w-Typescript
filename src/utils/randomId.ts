const generateRandomId = () => {
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const date = new Date().getTime().toString(36);
    return random + date;
}

export default generateRandomId;