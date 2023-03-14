import { render } from "@testing-library/react";
import Seccion from "../modulos/secciones/seccion";
import { MemoryRouter } from "react-router-dom";

describe("render seccion by id", () => {
  it("wrong id", () => {
    const id = "1234";
    const { container } = render(
      <MemoryRouter>
        <Seccion id={id} />
      </MemoryRouter>
    );

    const titulo = container.querySelector(".seccion .titulo");
    expect(titulo).not.toBeInTheDocument();
  });
});
