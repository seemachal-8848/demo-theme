import { Placeholder } from 'react-bootstrap';

const CategoryMenuListSkeleton = () => {
    return (
        <div className="container" style={{ overflowX: 'auto' }}>
            {/* Menu Item Placeholders */}
            <div className="d-flex flex-grow-1 justify-content-between">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="mx-2">
                        <Placeholder animation="glow">
                            <Placeholder xs={12} style={{ height: '20px', width: '80px' }} />
                        </Placeholder>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CategoryMenuListSkeleton