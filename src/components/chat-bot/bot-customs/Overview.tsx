import Options from './Options'

const GeneralOptions = (props: any) => {
  const options = [
    {
      name: 'Ingredient Substitutions',
      handler: props.actionProvider.GetIngrediantsSubstitudes,
      id: 1
    }
    // {
    //   name: 'Get Ingredients',
    //   handler: props.actionProvider.handleGetIngridients,
    //   id: 2
    // },
    // {
    //   name: 'Nutritional Information',
    //   handler: props.actionProvider.handleNutristionalInformation,
    //   id: 3
    // },
    // {
    //   name: 'Cooking Tips 😉',
    //   handler: props.actionProvider.handleCookingTips,
    //   id: 4
    // }
  ]
  return options
}

const Overview = (props: any) => {
  return <Options options={GeneralOptions(props)} title="Options" {...props} />
}

export default Overview
