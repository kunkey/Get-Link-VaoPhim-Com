const helper = require('../helpers');
const axios = require('axios');

const checkUrlValidate = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

const getPostData = async (urlMovie) => {
    try {
        var config = {
            method: 'get',
            url: urlMovie,
            headers: {}
        };

        const siteResp = await axios(config);
        const jsonResp = helper.cutstring(siteResp.data, 'var halim_cfg = ', '</script>');
        const dataResp = JSON.parse(jsonResp);

        const exportData = {
            status: true,
            data: {
                player: dataResp.player_url,
                episode_slug: dataResp.episode_slug,
                server: dataResp.server,
                post_id: dataResp.post_id
            }
        };

        return exportData

    }catch(error) {
        return {
            status: false,
            msg: 'Can\'t not get ID POST'
        };   
    }
}

const getPlayer = async (UrlMovie) => {
    try {

        const movieData = await getPostData(UrlMovie);

        var config = {
            method: 'get',
            url: movieData.data.player+'?episode_slug='+movieData.data.episode_slug+'&server_id=1&subsv_id='+movieData.data.server+'&post_id='+movieData.data.post_id,
            headers: { 
              'X-Requested-With': 'XMLHttpRequest'
            }
          };

        const getPlayer = await axios(config);
        const playerInit = getPlayer.data.data.sources; 

        try {
            const fileSource = helper.cutstring(playerInit, 'sources: [', ']');
            exportData = {
                status: true,
                data: JSON.parse(fileSource)
            }
            return exportData;
        }catch(error) {
            return {
                status: false,
                msg: 'Can\'t not get Player'
            };
        }

    }catch(error) {
        return {
            status: false,
            msg: 'Can\'t not get Player'
        };
    }
}


module.exports = {
    checkUrlValidate,
    getPostData,
    getPlayer
}
