const cutstring = (string, start, end) => {
    const nd1 = string.split(start);
    const nd2 = nd1[1].split(end);
    return nd2[0];
};



module.exports = {
    cutstring
}