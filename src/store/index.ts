// store module
import { reactive } from 'vue'

export const store = reactive({
    user: null,
    isLoggedIn: false,
    accessToken: null,
    roles: null,
    isAdmin: false,
});

export default store;