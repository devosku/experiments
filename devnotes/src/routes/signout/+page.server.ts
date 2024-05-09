import { signOut } from "../../lib/hooks/auth"
import type { Actions } from "./$types"
 
export const actions: Actions = { default: signOut }
