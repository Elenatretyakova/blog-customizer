import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const asideRef = useRef<HTMLDivElement>(null);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState({ ...formState, contentWidth: option });
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<div ref={asideRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text size={31} uppercase weight={800}>
							Задайте параметры
						</Text>
						<Select
							title='шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>
						<RadioGroup
							name={'fontSize'}
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
							title='размер шрифта'
						/>
						<Select
							title='цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							title='цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>
						<Select
							title='ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='button'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
