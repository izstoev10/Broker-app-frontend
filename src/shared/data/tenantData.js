import api from "../api/api"

class TenantData {
    async getAllAsync() {
        return await api.getAsync("/api/tenants");
    }

}

export default new TenantData();