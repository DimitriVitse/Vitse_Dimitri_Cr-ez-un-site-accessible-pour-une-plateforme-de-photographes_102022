const getParamId = () => {
    let params = new URL(document.location).searchParams;
    let id = parseInt(params.get("id"));
    return id;
};
