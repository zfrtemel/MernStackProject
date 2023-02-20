import { useState } from "react";
import Modal from "../Components/Modal/index";
export const GoalItem = (goal) => {
    const [show, setShow] = useState(false);

    return (
        <tr className="bg-white border-b   hover:bg-gray-50 ">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {goal.goal._id}
            </th>
            <td className="px-6 py-4">
                {goal.goal.head}
            </td>
            <td className="px-6 py-4">
                {goal.goal.desc}
            </td>
            <td className="px-6 py-4">
                {new Date(goal.goal.created_at).toLocaleString()}
            </td>
            <td className="px-6 py-4">
                {new Date(goal.goal.deadline).toLocaleString() === 'Invalid Date' ? '' : new Date(goal.goal.deadline).toLocaleString()}
            </td>
            <td className="px-6 py-4 text-right flex flex-col">
                <button className="font-medium text-red-600  hover:underline"></button>
                <button onClick={() => setShow(true)}>Delete</button>
                <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
                    <p>This is modal body</p>
                </Modal>
                <button className="font-medium text-blue-600  hover:underline">Edit</button>
            </td>
        </tr>

    )
}
