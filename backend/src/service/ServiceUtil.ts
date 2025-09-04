export const validateField = async (
  fieldBd: any,
  field: any,
  fieldMessage: string,
  errors: string[],
  isEdit: boolean = false,
  id: number = null,
  repo: any
) => {
  const whereObj: any = {
    [fieldBd]: field,
  };
  if (isEdit && id) {
    const existentDoctor = await repo
      .createQueryBuilder("doctor")
      .where(`doctor.${fieldBd} = :field`, { field })
      .andWhere("doctor.id != :id", { id })
      .getOne();

    if (existentDoctor) {
      errors.push(`Já existe um psicólogo cadastrado com este ${fieldMessage}`);
    }
    return;
  }

  const existentDoctor = await repo.findOne({ where: whereObj });

  if (existentDoctor) {
    errors.push(`Já existe um psicólogo cadastrado com este ${fieldMessage}`);
  }
};
