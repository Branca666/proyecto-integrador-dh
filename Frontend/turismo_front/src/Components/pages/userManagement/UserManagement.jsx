import { Link } from "react-router-dom";
import styles from "./UserManagement.module.css";
import { FaUserCog, FaPlane, FaTags } from "react-icons/fa";
import AdminCard from "../../adminCards/AdminCard";
import { useNavigate } from "react-router-dom";

const adminOptions = [
    {
        name: "Registrar usuario",
        path: "/admin/users/register",
        icon: FaUserCog,
        title: "Registrar Usuario",
        description: "Agrega un nuevo usuario al sistema."
    },
    {
        name: "Ver usuarios registrados",
        path: "/admin/users/list",
        icon: FaUserCog,
        title: "Usuarios Registrados",
        description: "Consulta la lista de usuarios existentes."
    }
];

const UserManagement = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.adminContainer}>
            <div className={styles.sideBar}>
                <ul>
                    {adminOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                            <li key={index}>
                                <Link to={option.path}>
                                    <span className={styles.icon}><IconComponent /></span>
                                    {option.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={styles.content}>
                <div className={styles.cardsContainer}>
                    <div className={styles.cardContainer}>
                        <AdminCard options={adminOptions} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            Regresar al Panel Administrador
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserManagement;
