import unidecode from 'unidecode';


const createSlug = (str) => {
    return unidecode(str)
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') 
    .replace(/\s+/g, '-') 
    .trim();
};

export default createSlug;