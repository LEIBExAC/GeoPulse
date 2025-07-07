import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLatestLocation, getLocationHistory } from '../../../assets/api/locationApi';

