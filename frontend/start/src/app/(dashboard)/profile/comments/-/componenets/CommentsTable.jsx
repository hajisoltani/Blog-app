

import { getAllCommentsApi } from "@/services/commentService";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import CommentsRow from "./CommentsRow";
import { Fragment } from "react";


async function CommentsTable() {
    const { comments, commentsCount } = await getAllCommentsApi();
    if (!comments.length) return <Empty resourceName="نظری" />;

    let iterator = 0;

    return (
        <Table>
            <Table.Header>
                <th>#</th>
                <th>متن</th>
                <th>نویسنده</th>
                <th>تاریخ ایجاد</th>
                <th>وضعیت</th>
                <th>عملیات</th>
            </Table.Header>
            <Table.Body>
                {comments.map((comment) => {
                    iterator++;
                    return (
                        <Fragment key={comment._id}>
                            <CommentsRow
                                key={comment._id}
                                comment={comment}
                                index={iterator}
                            />
                            {comment.answers.map((commentAnswer) => {
                                iterator++;
                                return (
                                    <CommentsRow
                                        key={commentAnswer._id}
                                        comment={commentAnswer}
                                        index={iterator}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
export default CommentsTable;
