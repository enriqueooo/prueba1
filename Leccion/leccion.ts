interface NaveEspacial {
    salud: number;
    capacidadCarga: number;
    velocidad: number;
}

enum TipoRecurso {
    Mineral,
    Gas,
    Agua
}

enum Peligro {
    Meteoritos,
    Radiacion,
    TormentaEspacial
}

class Planeta {
    constructor(public tipoRecurso: TipoRecurso, public peligro: Peligro) {}
}

class Evento {
    constructor(public afectaSalud: boolean, public afectaCarga: boolean, public afectaVelocidad: boolean) {}
}

function explorar(direccion: 'norte' | 'sur' | 'este' | 'oeste') {
    console.log(`Navegando hacia el ${direccion}...`);
}

function recolectarRecursos<T>(planeta: Planeta): T {
    let recurso: T;
    switch (planeta.tipoRecurso) {
        case TipoRecurso.Mineral:
            recurso = <T>(<unknown>"Mineral recolectado");
            break;
        case TipoRecurso.Gas:
            recurso = <T>(<unknown>"Gas recolectado");
            break;
        case TipoRecurso.Agua:
            recurso = <T>(<unknown>"Agua recolectada");
            break;
        default:
            recurso = null!;
            break;
    }
    return recurso;
}

function manejarEvento<T, U>(evento: Evento, recurso: T, nave: U) {
    if (evento.afectaSalud) {
        (nave as any).salud -= 10;
        console.log("La salud de la nave ha disminuido debido al evento.");
    }
    if (evento.afectaCarga) {
        (nave as any).capacidadCarga -= 20;
        console.log("La capacidad de carga de la nave ha disminuido debido al evento.");
    }
    if (evento.afectaVelocidad) {
        (nave as any).velocidad -= 50;
        console.log("La velocidad de la nave ha disminuido debido al evento.");
    }
}

function capturarEntrada() {
    const input = prompt("Introduce tu decisión:");
    if (input) {
        return input;
    } else {
        throw new Error("Entrada inválida.");
    }
}

function simularViaje(tiempo: number, distancia: number, decisionUsuario: string, eventos: Evento[], nave: NaveEspacial) {
    console.log(`Simulando viaje durante ${tiempo} días a una distancia de ${distancia} unidades.`);
    console.log(`Decisión del usuario: ${decisionUsuario}`);
    console.log(`Estado inicial de la nave: ${JSON.stringify(nave)}`);
    for (let evento of eventos) {
        manejarEvento(evento, null, nave);
    }
    console.log(`Estado final de la nave: ${JSON.stringify(nave)}`);
}

namespace Navegacion {
    export function navegarHacia(direccion: 'norte' | 'sur' | 'este' | 'oeste') {
        explorar(direccion);
    }
}

namespace GestionEventos {
    export function generarEventosAleatorios(): Evento[] {
        const eventos: Evento[] = [];
        for (let i = 0; i < 3; i++) {
            eventos.push(new Evento(Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5));
        }
        return eventos;
    }
}

namespace InterfazUsuario {
    export function mostrarMensaje(mensaje: string) {
        console.log(`Mensaje: ${mensaje}`);
    }
}

const miNave: NaveEspacial = {
    salud: 100,
    capacidadCarga: 200,
    velocidad: 500
};

const miPlaneta = new Planeta(TipoRecurso.Mineral, Peligro.Meteoritos);

console.log("Iniciando simulación...");

const eventosAleatorios = GestionEventos.generarEventosAleatorios();

Navegacion.navegarHacia('norte');

const recursoRecolectado = recolectarRecursos<string>(miPlaneta);

simularViaje(10, 1000, "Explorar", eventosAleatorios, miNave);
