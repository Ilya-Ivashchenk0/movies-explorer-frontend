import './AboutProject.css'

function AboutProject() {
  return (
    <section className='about-project'>
      <h3 className='about-project__title'>О проекте</h3>
      <ul className='about-project__table'>
        <li className='about-project__table-cell'>
          <h4 className='about-project__heading'>Дипломный проект включал 5 этапов</h4>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about-project__table-cell'>
          <h4 className='about-project__heading'>На выполнение диплома ушло 5 недель</h4>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='about-project__loading-bar'>
        <p className='about-project__bar about-project__bar_type_green'>1 неделя</p>
        <p className='about-project__bar about-project__bar_type_gray'>4 недели</p>
        <p className='about-project__bar about-project__bar_type_void'>Back-end</p>
        <p className='about-project__bar about-project__bar_type_void'>Front-end </p>
      </div>
    </section>
  )
}

export default AboutProject
