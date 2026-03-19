import { Play } from "phosphor-react"
import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from "./styles"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
 

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod.number().min(5).max(60),
})

// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })  

  function handleCreateNewCicle(data: NewCycleFormData) {
    console.log(data);
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em: </label>  
          <TaskInput 
          id="task" 
          list="task-suggestions" 
          placeholder="De um nome para seu projeto"
          {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
          </datalist>

          <label htmlFor="">durante: </label>
          <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          step={5} 
          min={5} 
          max={60} 
          {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator> 
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled}  type="submit"> <Play size={24} /> Começar</StartCountdownButton>
      </form> 
    </HomeContainer>
  )
}