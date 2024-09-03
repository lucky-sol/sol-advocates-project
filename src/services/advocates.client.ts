import { IAdvocate } from "@/db/schema";
import axios from "axios";
import { IAdvocateFilteredSchema } from "@/app/api/advocates/route"

// Can be exportable if needed in other files
const APIS = {
    ADVOCATES: '/api/advocates'
}

/**
 * Class representing an AdvocatesClient.
 */
class AdvocatesClient {
    /**
     * Retrieves advocates from the API.
     * @returns A Promise that resolves to an object representing the advocates.
     * @throws {Error} If the request fails.
     */
    async getAdvocates(params: IAdvocateFilteredSchema): Promise<{ data: IAdvocate[]; totalNumPages: number; totalNumAdvocates: number }> {
        const response = await axios.post(APIS.ADVOCATES, params);
        return response?.data;
    }
}

// In this case, a better approach would be an @Injectable decorator
// - Lucky M
const instance = new AdvocatesClient();
export default instance;