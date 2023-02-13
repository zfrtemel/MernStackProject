
export const GoalItem = ({ goal }) => {

    return (
        <tr className="bg-white border-b   hover:bg-gray-50 ">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {goal._id}
            </th>
            <td className="px-6 py-4">
                {goal.head}
            </td>
            <td className="px-6 py-4">
                {goal.desc}
            </td>
            <td className="px-6 py-4">
                {goal.created_at}
            </td>
            <td className="px-6 py-4">
                {goal.deadline}
            </td>
            <td className="px-6 py-4 text-right">
                <a href="/" className="font-medium text-blue-600  hover:underline">Edit</a>
            </td>
        </tr>

    )
}
