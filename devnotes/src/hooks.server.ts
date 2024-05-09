import { sequence } from "@sveltejs/kit/hooks";
import { handle as handleAuth} from "$lib/hooks/auth"
import { handle as handleFirewall} from "$lib/hooks/firewall"
import { handle as handleUser} from "$lib/hooks/user"


export const handle = sequence(
    handleAuth,
    handleFirewall,
    handleUser
);