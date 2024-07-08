
const base_url = import.meta.env.VITE_BASE_API_URL
export const imgUrl = (image) => {
    if (image) {
        if (image.includes(base_url))
            return image
        return `${base_url}/${image}`;
    }
    else
        return "/public/favicon.png";
};

export const userimgUrl = (image) => {
    if (image) {
        if (image.includes(base_url))
            return image
        return `${base_url}/${image}`;
    }
    else
        return "/public/favicon.png";
};
