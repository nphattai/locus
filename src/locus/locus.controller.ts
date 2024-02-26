import { Controller, Get, Query } from '@nestjs/common';
import { LOCUS_SIDELOADING, LocusService } from './locus.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('locus')
export class LocusController {
  constructor(private readonly locusService: LocusService) {}

  @Get()
  @ApiOperation({ summary: 'Get Locus data' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'assemblyId', required: false, type: String })
  @ApiQuery({ name: 'regionId', required: false, type: Number })
  @ApiQuery({ name: 'membershipStatus', required: false, type: String })
  @ApiQuery({
    name: 'sideloading',
    required: false,
    enum: [LOCUS_SIDELOADING.LOCUS_MEMBERS],
    type: String,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  getLocus(
    @Query('id') id: number,
    @Query('assemblyId') assemblyId: string,
    @Query('regionId') regionId: number,
    @Query('membershipStatus') membershipStatus: string,
    @Query('sideloading') sideloading: LOCUS_SIDELOADING,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.locusService.getLocus({
      id,
      assemblyId,
      regionId,
      membershipStatus,
      sideloading,
      page,
      limit,
    });
  }
}
