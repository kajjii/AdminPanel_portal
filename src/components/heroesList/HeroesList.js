import { useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./heroesList.scss";

const HeroesList = () => {

	const {
		data: heroes = [],
		isLoading,
		isError,
	} = useGetHeroesQuery()

	const [deleteHero] = useDeleteHeroMutation()

	const activeFilter = useSelector(state => state.filters.activeFilter)

	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice() // создаем копию, чтобы избежать мутаций

		if (activeFilter === "all") {
		  return filteredHeroes;
		} else {
		  return filteredHeroes.filter((item) => item.element === activeFilter);
		}
	  }, [heroes, activeFilter])

	  const onDelete = useCallback((id) => {
		deleteHero(id)
		// eslint-disable-next-line
	}, [])

	if (isLoading) {
		return <Spinner />;
	} else if (isError) {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
	}

	const renderHeroesList = (data) => {
		if (data.length === 0) {
		return <h5 className="text-center mt-5">Героев пока нет</h5>;
		}

		return data.map(({ id, ...props }) => {
		return (
			<HeroesListItem
			{...props}
			className="hero"
			key={id}
			onDelete={() => onDelete(id)}
			/>
		);
		});
	};

	return <ul>{renderHeroesList(filteredHeroes)}</ul>;
	};

export default HeroesList;
