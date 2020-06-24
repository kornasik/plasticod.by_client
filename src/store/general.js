import GeneralService from "../services/general";
import SocialService from "../services/social";
import SliderService from "../services/slider";

export default {
    state: {
        numberPhone: '',
        images: [],
        socials: {
            viber: '',
            skype: '',
            instagram: '',
            whatsapp: '',
            facebook: '',
            vk: '',
            telegram: ''
        }
    },
    mutations: {
        setGeneral(state, general) {
            state.numberPhone = general.numberPhone;
        },
        setSocial(state, socials){
            state.socials = socials
        },
        setSlider(state, slider){
            state.images = slider
        }
    },
    getters: {
        general(state) {
            return state;
        },
        numberPhone(state){
            return state.numberPhone
        }
    },
    actions: {
        async getGeneral({commit}) {
            await GeneralService.getGeneral().then(({data}) => {
                commit('setGeneral', data[0])
            }).catch(() => {
                commit('setGeneral', {
                    numberPhone: '(+375) 29 103-15-86'
                })
            });
            await SocialService.getSocial().then(({data})=>{
                commit('setSocial', data[0])
            });

            await SliderService.getSlider().then(({data})=>{
                const images = data.map((image)=>{
                    return image.pathImage
                })
                commit('setSlider', images)
            });
        }
    }
}