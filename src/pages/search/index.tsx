import { useAuth } from "@/AuthContext";
import Header from "@/shared/header";

const Search = () => {

    const { user, login, logout } = useAuth();
    
    return (
        <>
            <Header user={user} login={login} logout={logout}/>
            <h1>search page</h1>
        </>
    );
}

export default Search;