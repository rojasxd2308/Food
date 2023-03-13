import { useState } from 'react';

export default function Paginacion({ options, paginate, handlePageClick }) {
    const [pagina_actual, setCurrentPage] = useState(1);
    const total_paginas = Math.ceil(options.cantidad / paginate.espacio);

    const handlePrevClick = () => {
        if (pagina_actual > 1) {
            setCurrentPage(pagina_actual - 1);
            handlePageClick({ selected: pagina_actual - 2 }); // La numeración de páginas empieza en cero, por eso se resta 2
        }
    };

    const handleNextClick = () => {
        if (pagina_actual < total_paginas) {
            setCurrentPage(pagina_actual + 1);
            handlePageClick({ selected: pagina_actual }); // La numeración de páginas empieza en cero, por eso no se resta nada
        }
    };

    const handlePageNumberClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        handlePageClick({ selected: pageNumber - 1 }); // La numeración de páginas empieza en cero, por eso se resta 1
    };

    const secciones_navegacion = () => {
        const pageNumbers = [];
        for (let i = 1; i <= total_paginas; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="navigation">
            <ul className="pagination">
                <li className={`page-item ${pagina_actual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevClick}>
                        &lt; Anterior
                    </button>
                </li>
                {secciones_navegacion().map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${pagina_actual === pageNumber ? 'selected' : ''}`}
                    >
                        <button className="page-link" onClick={() => handlePageNumberClick(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${pagina_actual === total_paginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNextClick}>
                        Siguiente &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
}