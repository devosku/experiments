import { signIn } from "../../lib/hooks/auth"
import type { Actions } from "./$types"

export const actions: Actions = { default: signIn }
