export const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "").slice(0, 11);
    return `+7 (${cleaned.slice(1, 4)}${cleaned.length > 4 ? ") " : ""}${cleaned.slice(4, 7)}${cleaned.length > 7 ? "-" : ""}${cleaned.slice(7, 9)}${cleaned.length > 9 ? "-" : ""}${cleaned.slice(9, 11)}`;
};