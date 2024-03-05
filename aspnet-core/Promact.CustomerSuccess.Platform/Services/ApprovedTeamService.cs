
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.Service
{
    public class ApprovedTeamService : ApplicationService,
        IApprovedTeamService
    {
        private readonly IRepository<ApprovedTeam, Guid> _repository;
        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<List<ApprovedTeam>> GetAllAsync()
        {
            var entities = await _repository.GetListAsync();
            return entities;
        }

        public async Task<ApprovedTeam> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            return entity;
        }

        public async Task<ApprovedTeam> CreateAsync(CreateApprovedTeamDto input)
        {
            var entity = ObjectMapper.Map<CreateApprovedTeamDto, ApprovedTeam>(input);
            await _repository.InsertAsync(entity, autoSave: true);
            Console.WriteLine(entity);
            return entity;
        }

        public async Task UpdateAsync(Guid id, UpdateApprovedTeamDto input)
        {
            var entity = await _repository.GetAsync(id);
            ObjectMapper.Map(input, entity);
            await _repository.UpdateAsync(entity, autoSave: true);
        }

        public async Task DeleteAsyncById(Guid id)
        {
            await _repository.DeleteAsync(id, autoSave: true);
        }
    }
}
