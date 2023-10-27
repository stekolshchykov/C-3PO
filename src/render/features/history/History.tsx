import React from "react"
import PageLayout from "../../components/PageLasyout";

const History = () => {

    const mokeData = ["asdasfwe", "string 2", "В React и TypeScript есть и другие встроенные типы, такие как React.FC для функциональных компонентов, React.Component для классовых компонентов", "В этом примере ContentWrapper - это компонент-обертка, который принимает children в качестве свойства и отображает их внутри своей разметки. Вы можете стилизовать эту обертку и добавлять к ней любой дополнительный контент или функциональность, которую вам необходимо."]

    return <PageLayout title={"History"}>
        <ul>
            {mokeData.map(d => <li className={"px-3"}>{d}</li>)}
        </ul>
    </PageLayout>
}

export default History