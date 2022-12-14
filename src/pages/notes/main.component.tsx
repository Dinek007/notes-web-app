import React, { useState } from 'react'
import { Box } from '@mui/material'
import { CategoryListComponent } from './categoryList.component'
import { AddItemComponent } from '../../components/addItemFrom.component'
import { NotesPageHeaderComponent } from './notesPageHeader.component'
import { NotesFieldComponent } from './notesField.component'

export const NotesComponent = () => {
    const [showAddCategoryForm, setShowAddCategoryForm] = useState<boolean>(false)

    const handleCloseAddCategoryPopup = () => {
        setShowAddCategoryForm(false)
    }

    const handleShowAddCategoryPopup = () => {
        setShowAddCategoryForm(true)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%'
        }}>
            {showAddCategoryForm && (
                < AddItemComponent
                    handleCloseAddCategoryPopup={handleCloseAddCategoryPopup}
                />
            )}
            <CategoryListComponent
                handleShowAddCategoryPopup={handleShowAddCategoryPopup}
            />

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                float: 'left',
                width: '85vw'
            }}>
                <NotesPageHeaderComponent />
                <NotesFieldComponent />
            </Box>

        </Box>
    )
}