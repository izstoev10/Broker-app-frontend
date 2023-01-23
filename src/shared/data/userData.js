import api from "../api/api"

class UserData {
    async login(payload) {
        return await api.postAsync("/api/login", payload);
    }

}

export default new UserData();