const options = {
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    hour12: false,
};

export const { format } = new Intl.DateTimeFormat("en-US", options);