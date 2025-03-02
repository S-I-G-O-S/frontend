import { logoutFunc } from "../services/backend/authAPI"
import { deleteCookie } from "../services/cookies"

export const checkAuthError = (error) => {
    if (error.status==403) {
        console.warn('apagando token')
        logoutFunc()
        location.reload()
    }
}