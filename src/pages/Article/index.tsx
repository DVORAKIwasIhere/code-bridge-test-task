import { useParams } from "react-router"
import { appStore } from "../../store/app"

import { RootState } from './../../store/store';

export const Article = () => {
    const {articleId} = useParams()
    return(
        <span>
            <span>{articleId}</span>
        </span>
    )
}