import CheckServerCookie from "@/app/components/checkCookie/checkServerCookie";
import searchQuestions from "./actions/searchQuestions";
import searchWordsSuggestions from "./actions/searchWordsSuggestions";
import SearchContainer from "./components/searchbar/searchContainer";
import searchValorations from "./actions/searchValoration";
import type { QuestionSQL } from "@/app/models/QuestionSQL";
import Question from "./components/questions/question";
import Valorations from "./components/social/valorations/valorations";
import ValorationButton from "./components/social/valorations/valorationButton";
import getInfoAuthCookie from "@/app/server-actions/helpers/getInfoAuthCookie";
import type { UserType } from "@/app/models/User";
import searchComments from "./actions/searchComments";
import Pagination from "@/app/components/pagination/pagination";
import DisplayMedicineStudentMessage from "./components/questions/displayMedicineStudentMessage/displayMedicineStudentMessage";
import Container from "@/app/components/container/container";
import AllTheCommentContent from "./components/social/comments/allTheCommentContent/allthecommentContent";
export default async function QuestionPage({
	searchParams,
}: {
	searchParams: {
		page: number;
		query?: string;
	};
}) {
	const currentPage = Number(searchParams?.page) || 1;
	const query = searchParams?.query || "";
	const authData = (await getInfoAuthCookie()) as UserType;
	let queries: string | string[];
	if (query) {
		// Divide la cadena en un array de palabras si no está vacía
		queries = query.split(" ");
	} else {
		// Si la cadena está vacía, establece el array de consultas como un array vacío
		queries = [];
	}

	const searchQuestionsResult = await searchQuestions(
		queries,
		searchParams.page,
	);
	const questions = searchQuestionsResult?.resultQueryLimit10;
	const questionsCount = searchQuestionsResult?.resultLength;
	const paginatiototalQuestion = Math.ceil(questionsCount / 10);
	let valorations: undefined = undefined;
	if (authData) valorations = await searchValorations(questions);

	const wordsSuggestions = await searchWordsSuggestions(queries);

	let treeComments = {} as any;

	if (authData) {
		const result = await searchComments(questions);
		treeComments = {
			...(result && result.tree ? result.tree : null),
		};
	}

	return (
		<div className="mt-8">
			<Container
				title="Buscador de Preguntas"
				subtitle="Busca preguntas en nuestra base de datos"
			>
				<span></span>
			</Container>

			<CheckServerCookie auth={authData}>
				<div className="flex flex-col items-start max-w-[60rem] mx-auto mt-8">
					<SearchContainer
						query={query}
						currentPage={currentPage}
						wordsSuggestions={wordsSuggestions}
						questionsCount={questionsCount}
						questions={questions}
					>
						{query !== "" && query.length > 2 && (
							<>
								{questions &&
									questions.map((item: QuestionSQL, index: number) => (
										<div
											key={index}
											className=" border border-gray-400 rounded my-4 px-4 pb-4"
										>
											<Question item={item} userId={authData?.id} />
											{valorations && (
												<>
													<Valorations
														id_question={item.id}
														valorations={valorations}
													/>
													<div className="flex flex-wrap gap-4">
														<ValorationButton id_question={item.id} />
													</div>
													<AllTheCommentContent
														item={item}
														treeComments={treeComments}
														currentUser={authData}
													/>
												</>
											)}
										</div>
									))}
							</>
						)}
					</SearchContainer>
				</div>
				{searchParams.query && questions?.length > 0 && (
					<Pagination
						currentUser={authData}
						totalQuestions={paginatiototalQuestion}
					/>
				)}
				{!searchParams.query && !questions && <DisplayMedicineStudentMessage />}
				{questions?.length === 0 && (
					<h1 className="text-center font-bold mt-5">
						No encotramos coincidencia con tu busqueda
					</h1>
				)}
			</CheckServerCookie>
		</div>
	);
}
