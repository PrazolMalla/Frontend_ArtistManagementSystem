export const imgUrl = (image) => {
    const base_url = import.meta.env.VITE_API_BASE_URL
    if (image) {

        console.log(base_url)

        return `${base_url}/${image}`;
    }
    else
        return "/public/favicon.png";
};
