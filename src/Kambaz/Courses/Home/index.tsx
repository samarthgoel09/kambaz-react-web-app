import CourseStatus from "./Status";
import Modules from "../Modules";


export default function Home() {
    return (
        <div className="d-flex">

            <div className="flex-fill">
                <Modules />

            </div>
            <div className="d-none d-xl-block ms-4" style={{ width: 350 }}>
                <CourseStatus />
            </div>

        </div>

    );

}