import Header from "@components/Header";
import PokemonBanner from "@components/PokemonBanner";
import MuteButton from "@components/MuteButton";
import HighScoreTable from "@components/HighScoreTable";

import usePokeApi from "@hooks/usePokeApi";
import useGameReducer from "@hooks/useGameReducer";

export default function Game() {
  let [state, dispatch] = useGameReducer();
  let {
    gameState,
    score,
    currentPokemon,
    mostRecentlySubmitted,
    guessedPokemon,
    soundOn,
    scores,
  } = state;

  usePokeApi(mostRecentlySubmitted, dispatch);

  return (
    <>
      <MuteButton soundOn={soundOn} dispatch={dispatch} />
      <Header text={`Pokémon Naming Game`} />
      {gameState === "NOT_STARTED" && (
        <>
          <HighScoreTable scores={scores} />
          <button
            type="button"
            className="nes-btn is-warning"
            onClick={() => {
              dispatch({ type: "START_GAME" });
            }}
          >
            Start Game
          </button>
        </>
      )}
      {gameState === "STARTED" && (
        <>
          <PokemonBanner pokeArr={guessedPokemon} />
          <input
            type="text"
            placeholder="Name Pokemon"
            className="nes-input"
            value={currentPokemon}
            onChange={(e) => {
              dispatch({ type: "TYPE_POKEMON", pokemon: e.target.value });
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                dispatch({
                  type: "SUBMIT_POKEMON",
                  pokemon: e.target.value.trim(),
                });
              }
            }}
          />
          <button
            onClick={() => {
              dispatch({ type: "END_GAME" });
            }}
            type="button"
            className="nes-btn is-error"
          >
            I'm done
          </button>
        </>
      )}
      {gameState === "FINISHED" && (
        <>
          <div className="score-container">
            <i className="nes-ash"></i>
            <span className="nes-balloon from-left">{score} found of 151</span>
          </div>

          <button
            onClick={() => {
              dispatch({ type: "START_GAME" });
            }}
            type="button"
            className="nes-btn is-success"
          >
            Try again
          </button>
          <button
            onClick={() => {
              dispatch({ type: "VIEW_HS_TABLE" });
            }}
            type="button"
            className="nes-btn is-primary"
          >
            View High Scores
          </button>
        </>
      )}
      <style jsx>{`
        input {
          margin: 20px 0;
        }

        .score-container {
          display: flex;
        }
      `}</style>
    </>
  );
}
