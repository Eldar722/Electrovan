import leftIcon from '../assets/images/icons/left-icon.svg';
import rightIcon from '../assets/images/icons/right-icon.svg';

function Paginator({ totalPages, currentPage, setCurrentPage }) {
    if (!totalPages || totalPages < 2) return null;

    const getPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(i);
            }
        }
        return pages;

    };

    const pages = getPages();

    return (
        <nav className="paginator text-body-lg" aria-label="Навигация по страницам">
            <button className="left-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Предыдущая страница">
                <img src={leftIcon} alt='' aria-hidden="true" />
            </button>

            {pages.map((page, index) => {
                const prevPage = pages[index - 1];

                return (
                    <span key={page}>
                        {prevPage && page - prevPage > 1 && <span className='dots' aria-hidden="true">...</span>}
                        <button
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "active" : ""}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    </span>
                );
            })}

            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Следующая страница">
                <img src={rightIcon} alt='' aria-hidden="true" />
            </button>

        </nav>
    )
}

export default Paginator;