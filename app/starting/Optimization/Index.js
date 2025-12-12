import React, { useState } from 'react'
import Start from "./Start/Index"
import Submit from "./Submit/Index"

const Index = ({ user }) => {
    const [showTaskSubmissionDialog, setShowTaskSubmissionDialog] = useState(false)
    const [task, setTask] = useState()
    const [starting, setStarting] = useState(false)
    return (
        <>
            {/* Enhanced Product Optimization Section */}
            <Start setShowTaskSubmissionDialog={setShowTaskSubmissionDialog} user={user} setTask={setTask} starting={starting} setStarting={setStarting} />

            {/* Enhanced Task Submission Dialog */}
            <Submit task={task} showTaskSubmissionDialog={showTaskSubmissionDialog} setShowTaskSubmissionDialog={setShowTaskSubmissionDialog} user={user} setStarting={setStarting} />
        </>
    )
}

export default Index
